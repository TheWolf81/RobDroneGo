% Bibliotecas 
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_client)).
:- use_module(library(http/json)).
:- consult('main.pl').
:- dynamic pisos/2.
:- dynamic elevador/2.
:- dynamic liga/2.
:- dynamic corredor/4.

% Rela��o entre pedidos HTTP e predicados que os processam
:- http_handler('/lapr5', responde_ola, []).

% Cria��o de servidor HTTP no porto 'Port'					
server(Port) :-						
        http_server(http_dispatch, [port(Port)]).
		
responde_ola(_Request) :-					
        format('Content-type: text/plain~n~n'),
        format('Ol� LAPR5!~n').

send_get_request :-
    % Primeiro request para obter todos os IDs de edifício
    http_get('http://127.0.0.1:3000/api/building/getAll2', Reply1, []),
    atom_json_dict(Reply1, Dict1, []),
    findall(Code-DomainId, (member(Building, Dict1), Code = Building.get('code'), DomainId = Building.get('domain_id')), CodeDomainIds),

    % Para cada ID de edifício, faz um segundo request para obter os IDs de andar
    forall(
        member(Code-DomainId, CodeDomainIds),
        (
            format(atom(URL), 'http://127.0.0.1:3000/api/floor/getFloorsByBuildingId2/~w', [DomainId]),
            catch(
                (
                    http_get(URL, Reply2, []),
                    atom_json_dict(Reply2, Dict2, []), 
                    findall(
                        Name,
                        (member(Floor, Dict2.get('floorDTO')), Name = Floor.get('name')),
                        Names
                    ),
                    downcase_atom(Code, LowerCaseCode),
                    maplist(downcase_atom, Names, LowerCaseNames),
                    term_to_atom(LowerCaseCode, CodeTerm),
                    maplist(term_to_atom, LowerCaseNames, LowerCaseNamesTerms),
                    %format('Floor Names of Building ~w: ~w~n', [CodeTerm, LowerCaseNamesTerms]),
                    assertz(pisos(CodeTerm, LowerCaseNamesTerms)),
                    assertz(elevador(CodeTerm, LowerCaseNamesTerms))
                ),
                error(permission_error(url, _), _),
                true
            )
        )
    ),

    % Para cada ID de andar, faz um terceiro request para obter os mapas 
    % ...

http_get('http://127.0.0.1:3000/api/floor/Listarfloors', Reply2, []),
    atom_json_dict(Reply2, Dict2, []),
    % find domain ID
    findall(DomainId, (member(Floor, Dict2), DomainId = Floor.get('DomainId')), Ids),
    forall(
        member(Id, Ids),
        (
            format(atom(URL), 'http://127.0.0.1:3000/api/floor/getFloorMap/:~w', [Id]),
            catch(
                (
                    http_get(URL, Reply3, []),
                    atom_json_dict(Reply3, Dict3, []),
                    Map = Dict3.get('map'),
                    Name = Dict3.get('floorName'),
                    downcase_atom(Name, LowerCaseName),
                    term_to_atom(LowerCaseName, NameTerm),
                    cria_tabela(Map, NameTerm),
                    % Cria a parte das posições dos elevadores, salas, corredores
                    
                    %Ultimas 3 linhas a serem executadas (as posições das entidades já devem estar definidas)
                    Columns = Dict3.get('columns'),
                    Rows = Dict3.get('rows'),
                    cria_grafo(Columns, Rows, NameTerm)
                    
                ),
                error(permission_error(url, _), _),
                true
            )
        )
    ),
    
    http_get('http://127.0.0.1:3000/api/HallwayConnectionRoute/all', Reply4, []),
    atom_json_dict(Reply4, Dict4, []),
    findall(X, (member(HallwayConnectionRoute, Dict4), X = HallwayConnectionRoute.get('domainId')), XS),
    forall(
        member(X, XS),
        (
            format(atom(URL), 'http://127.0.0.1:3000/api/HallwayConnectionRoute/names/:~w', [X]),
            catch(
                (
                    http_get(URL, Reply5, []),
                    atom_json_dict(Reply5, Dict5, []),
                    Building1 = Dict5.get('building1'),
                    Building2 = Dict5.get('building2'),
                    Floor1 = Dict5.get('floor1'),
                    Floor2 = Dict5.get('floor2'),
                    downcase_atom(Building1, LowerCaseBuilding1),
                    downcase_atom(Building2, LowerCaseBuilding2),
                    downcase_atom(Floor1, LowerCaseFloor1),
                    downcase_atom(Floor2, LowerCaseFloor2),
                    term_to_atom(LowerCaseBuilding1, Building1Term),
                    term_to_atom(LowerCaseBuilding2, Building2Term),
                    term_to_atom(LowerCaseFloor1, Floor1Term),
                    term_to_atom(LowerCaseFloor2, Floor2Term),
                    assertz(liga(Building1Term, Building2Term)),
                    assertz(corredor(Building1Term, Building2Term, Floor1Term, Floor2Term))
                    
                ),
                error(permission_error(url, _), _),
                true
            )
        )
    )
    .

    % Criação das passagens e ligações
