% cria a base de conhecimento
:- consult('teste_web.pl').
:- send_get_request.
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_open)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_error)).
:- use_module(library(http/http_dispatch)).
:- consult('main.pl').
:- consult('algoritmosgeneticos.pl').

:- set_setting_default(http:cors, [*]).

:- http_handler('/path', processar_caminho, []).
:- http_handler('/task/melhor_sequencia',melhor_sequencia,[]).
:- http_handler('/task/genetico',genetico,[]).

genetico(Request):-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, [ng(NG_atom, []), dp(DP_atom, []), p1(P1_atom, []), p2(P2_atom, [])]),
    atom_number(NG_atom, NG),
    atom_number(DP_atom, DP),
    atom_number(P1_atom, P1),
    atom_number(P2_atom, P2),
    format('Content-type: application/json~n~n'),
    gera2(NG, DP, P1, P2, PopOrd),
    
    flatten(PopOrd, FlatPopOrd),
    with_output_to(string(PopOrdAsString), write(FlatPopOrd)),
    json_write(current_output, PopOrdAsString).


melhor_sequencia(Request):-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, []),
    format('Content-type: application/json~n~n'),
    melhor_sequencia(Seq,  MelhorDuracao),
    flatten(Seq, FlatSeq),
    with_output_to(string(SeqAsString), write(FlatSeq)),
    json_write(current_output, SeqAsString).
    %flatten(MelhorDuracao, FlatMelhorDuracao),
    %with_output_to(string(MelhorDuracaoAsString), write(FlatMelhorDuracao)),
    %json_write(current_output, MelhorDuracaoAsString).

processar_caminho(Request):-
    cors_enable(Request, [methods([get])]),
    http_parameters(Request, [origem(Origem, []), destino(Destino, [])]),
    format('Content-type: application/json~n~n'),
    caminho_final(Origem, Destino, Caminho, Custo),
    flatten(Caminho, FlatCaminho),
    with_output_to(string(CaminhoAsString), write(FlatCaminho)),
    json_write(current_output, CaminhoAsString).

start_server(Port) :-
    http_server(http_dispatch, [port(Port)]).

:- start_server(8080).
