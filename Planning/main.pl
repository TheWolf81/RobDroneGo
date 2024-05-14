:- consult('./pisos.pl').
:- consult('./bc.pl').
:- consult('./algoritmos_pesquisa.pl').
:- dynamic node/5.
:- dynamic edge/4.
:- set_prolog_flag(toplevel_print_options, [quoted(true), portray(true), max_depth(0)]).

cria_base_dados():-
  retractall(node(_, _, _, _, _)),
    retractall(edge(_, _, _, _)),
    cria_tabelas(),
    gerar_grafos().

cria_tabelas() :-
    pisoa1(Pisoa1),
    cria_tabela(Pisoa1,a1),
    pisoa2(Pisoa2),
    cria_tabela(Pisoa2,a2),
    pisob1(Pisob1),
    cria_tabela(Pisob1,b1),
    pisob2(Pisob2),
    cria_tabela(Pisob2,b2),
    pisob3(Pisob3),
    cria_tabela(Pisob3,b3),
    pisoc1(Pisoc1),
    cria_tabela(Pisoc1,c1),
    pisoc2(Pisoc2),
    cria_tabela(Pisoc2,c2).

% Conversão de células de matriz para Nodes.
cria_tabela(Matriz,Floor) :-
    converter_matriz_aux(Matriz, 1, 0,Floor).

converter_matriz_aux([], _, _,_).
converter_matriz_aux([Linha|Resto], LinhaAtual, ID,Floor) :-
    converter_linha(Linha, LinhaAtual, 1, ID, ProximoID,Floor),
    ProximaLinha is LinhaAtual + 1,
    converter_matriz_aux(Resto, ProximaLinha, ProximoID,Floor).

% Conversão de células de linha para Nodes.
converter_linha([], _, _, ID, ID,_).
converter_linha([Valor|Resto], Linha, Coluna, _, ProximoID,Floor) :-
    atomic_concat(Floor, '(', TempID),
    atomic_concat(TempID, Coluna, TempID2),
    atomic_concat(TempID2, ',', TempID3),
    atomic_concat(TempID3, Linha, TempID4),
    atomic_concat(TempID4, ')', NovoIDAtom),
    term_to_atom(NovoID, NovoIDAtom),
    assertz(node(NovoID, Coluna, Linha, Valor, Floor)),
    ProximaColuna is Coluna + 1,
    converter_linha(Resto, Linha, ProximaColuna, NovoID, ProximoID,Floor).

gerar_grafos():-
    cria_grafo(23,11,a1),
    cria_grafo(23,11,a2),
    cria_grafo(25,13,b1),
    cria_grafo(25,13,b2),
    cria_grafo(25,13,b3),
    cria_grafo(13,21,c1),
    cria_grafo(13,21,c2).


cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Piso):-
  cria_grafo_lin(Col,Lin,Piso),
  Lin1 is Lin-1,
  cria_grafo(Col,Lin1,Piso).


cria_grafo_lin(0,_,_):-!.

cria_grafo_lin(Col,Lin,Piso):-
  ((corr_pos(_, Col, Lin, Piso),
  node(Id1, Col, Lin, _, Piso))
  ;
  (elev_pos(_, Col, Lin, Piso),
  node(Id1, Col, Lin, _, Piso))
  ;
  (sala_pos(_, Col, Lin, Piso),
  node(Id1, Col, Lin, _, Piso))
  ;
  node(Id1,Col,Lin,0,Piso)),
  !,
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id2, 1, Piso));true)), % ligação à direita.
  ((node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id3, 1, Piso));true)), % ligação à esquerda.
  ((node(Id4,Col,LinS,0,Piso), assertz(edge(Id1, Id4, 1, Piso));true)), % ligação abaixo.
  ((node(Id5,Col,LinA,0,Piso), assertz(edge(Id1, Id5, 1, Piso));true)), % ligação acima.
  C is sqrt(2),
  ((node(Id6,ColS,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id6, C, Piso));true)), % Ligação à diagonal superior direita.
  ((node(Id7,ColA,LinA,0,Piso), node(Id5,Col,LinA,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id7, C, Piso));true)), % Ligação à diagonal superior esquerda.
  ((node(Id8,ColS,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id2,ColS,Lin,0,Piso), assertz(edge(Id1, Id8, C, Piso));true)), % Ligação à diagonal inferior direita.
  ((node(Id9,ColA,LinS,0,Piso), node(Id4,Col,LinS,0,Piso), node(Id3,ColA,Lin,0,Piso), assertz(edge(Id1, Id9, C, Piso));true)), % Ligação à diagonal inferior esquerda.

  Col1 is Col-1,
  cria_grafo_lin(Col1,Lin,Piso),!.

cria_grafo_lin(Col,Lin,Piso):-
  Col1 is Col-1,cria_grafo_lin(Col1,Lin,Piso).


% Calcula o caminho entre dois pisos, recebendo os identificadores de uma sala_pos, corredor ou elevador
caminho_final(Or,Dest, CamPorPiso, CustoTotal):-
  % Busca pelas coordenadas e piso da origem e do destino através dos identificadores.
  informacao_node(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest),

  % Calcula o trajeto entre pisos.
  caminho_pisos(PisoOr, PisoDest,_, Cam, PisosPer),

  node(X1, COr, LOr, _, PisoOr), 
  node(Y1, CDest, LDest, _, PisoDest), 
  % Calcula o trajeto dentro de cada piso.
  aStar_piso(PisosPer, CamPorPiso, Cam, X1, Y1, CustoTotal), nl,!.

informacao_node(Or, Dest, PisoOr, COr, LOr, PisoDest, CDest, LDest):-
  ((sala_pos(Or, COr, LOr, PisoOr);corr_pos(Or, COr, LOr, PisoOr);elev_pos(Or, COr, LOr, PisoOr)),
  (sala_pos(Dest, CDest, LDest, PisoDest);corr_pos(Dest, CDest, LDest, PisoDest);elev_pos(Dest, CDest, LDest, PisoDest))).


% Vai aplicar o A-Star a cada um dos pisos da solução de melhor_caminho_pisos ou caminho_pisos.
% 1º - Lista de pisos da solução.
% 2º - Lista de listas contendo as soluções do A-Star para cada piso.

%caso do último piso a ser analisado
aStar_piso([PisoDest|[]], [UltCaminho|[]], [], Or, Dest, Custo):-
  aStar(Or, Dest, UltCaminho, Custo, PisoDest), !.
%caso de pisos intermédios
% Encontra o ponto de conexão no piso atual e no próximo piso.
% Usa o aStar para encontrar o caminho entre os dois pontos de conexão do piso atual
% passa à próxima iteração, modificando as listas de forma a que os pisos que ainda não foram analisados sejam analisados.
aStar_piso([PisoAct, PisoProx|ProxPisos], [CamPiso|Restante], [TravessiaEd|Travessias], IdInicial, Dest, CustoTotal):-
  ((TravessiaEd == elev(PisoAct, PisoProx), elev_pos(_, Col, Lin, PisoAct), node(IdFinal, Col, Lin, _, PisoAct),
  aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), elev_pos(_, Col1, Lin1, PisoProx),
  node(IdInicialProxPiso, Col1, Lin1, _, PisoProx), !)
  ;
  (TravessiaEd == cor(PisoAct, PisoProx),atomic_concat(PisoAct,PisoProx, IdCorr), corr_pos(IdCorr, Col, Lin, PisoAct), node(IdFinal, Col, Lin, _, PisoAct),
  aStar(IdInicial, IdFinal, CamPiso, Custo, PisoAct), atomic_concat(PisoProx, PisoAct, IdCorrS), corr_pos(IdCorrS, Col1, Lin1, PisoProx),
  node(IdInicialProxPiso, Col1, Lin1, _, PisoProx), !)),
  append([PisoProx], ProxPisos, L),
  aStar_piso(L, Restante, Travessias, IdInicialProxPiso, Dest, CustoParcial),
  CustoTotal is CustoParcial + Custo.

