
:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:- use_module(library(lists)).
:-dynamic start_time/1.


% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,3,9,3).
tarefa(t5,3,8,2).

% transicao(Tarefa1,Tarefa2,TempoTransicao).
transicao(t1, t2, 3).
transicao(t2, t1, 3).
transicao(t1, t3, 1).
transicao(t3, t1, 1).
transicao(t1, t4, 2).
transicao(t4, t1, 2).
transicao(t1, t5, 3).
transicao(t5, t1, 3).
transicao(t2, t3, 2).
transicao(t3, t2, 2).
transicao(t2, t4, 1).
transicao(t4, t2, 1).
transicao(t2, t5, 1).
transicao(t5, t2, 1).
transicao(t3, t4, 2).
transicao(t4, t3, 2).
transicao(t3, t5, 2).
transicao(t5, t3, 2).
transicao(t4, t5, 4).
transicao(t5, t4, 4).

% tarefas(NTarefas).
tarefas(5).

% parameteriza��o
inicializa:-
	get_time(StartTime),
    asserta(start_time(StartTime)),
	write('Numero de novas Geracoes: '),read(NG), 			(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

inicializa2(NG,DP,P1,P2):-
	get_time(StartTime),
    asserta(start_time(StartTime)),
	(retract(geracoes(_));true), asserta(geracoes(NG)),
	(retract(populacao(_));true), asserta(populacao(DP)),
	PC is P1/100,
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

gera2(NG,DP,P1,P2,PopOrd):-
	inicializa2(NG,DP,P1,P2),
	gera_populacao(Pop),
	avalia_populacao(Pop,PopAv),
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao2(0,NG,PopOrd).

gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd).

gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

gera_populacao(0,_,_,[]):-!.

gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).

gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).

avalia_populacao([],[]).
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	avalia(Ind,V),
	avalia_populacao(Resto,Resto1).

avalia(Seq,V):-
	avalia(Seq,0,V).
% metodo original
%avalia([T|Resto],Inst,V):-
%	tarefa(T,Dur,Prazo,Pen),
%	InstFim is Inst+Dur,
%	avalia(Resto,InstFim,VResto),
%	(
%		(InstFim =< Prazo,!, VT is 0)
 % ;
%		(VT is (InstFim-Prazo)*Pen)
%	),
%	V is VT+VResto.

avalia([],_,0).
avalia([T],Inst,V):-
	tarefa(T,Dur,Prazo,Pen),
	InstFim is Inst+Dur,
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)
	),
	V is VT.
avalia([T1, T2|Resto],Inst,V):-
	tarefa(T1,Dur,Prazo,Pen),
	transicao(T1, T2, TempoTransicao),
	InstFim is Inst+Dur+TempoTransicao,
	avalia([T2|Resto],InstFim,VResto),
	(
		(InstFim =< Prazo,!, VT is 0)
  ;
		(VT is (InstFim-Prazo)*Pen)
	),
	V is VT+VResto.


ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).


btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).
% Verifica se a população estabilizou
estabilizou([_]).
estabilizou([_*V1, _*V2 | Resto]) :-
    V1 =:= V2,
    estabilizou([_*V2 | Resto]).

gera_geracao(G,G,Pop):-!,
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl,
	write('\n').

%gera_geracao(N,G,Pop):-
%	write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,
%	cruzamento(Pop,NPop1),
%	mutacao(NPop1,NPop),
%	avalia_populacao(NPop,NPopAv),
%	ordena_populacao(NPopAv,NPopOrd),
%	write(N1),
%	N1 is N+1,
%	gera_geracao(N1,G,NPopOrd).

gera_geracao(N, G, Pop):-
	 get_time(CurrentTime),
    start_time(StartTime),
    TimeElapsed is CurrentTime - StartTime,
    (TimeElapsed >= 50 -> % Se o tempo limite for atingido
        write('Tempo limite atingido.'), nl,
        write('Melhor solução encontrada: '), nl,
        write(Pop), nl
    ;
    write('Geração '), write(N), write(':'), nl, write(Pop), nl,
    elitismo(P),
    seleciona_elitismo(Pop, P, Elitismo),
    length(Elitismo, TamanhoElitismo),
    length(Pop, TamanhoPop),
    Restante is TamanhoPop - TamanhoElitismo,
    seleciona_restante(Pop, Restante, RestoPop),
    associa_produto(RestoPop, Produtos),
    ordena_populacao(Produtos, ProdutosOrd),
    length(ProdutosOrd, TamanhoProd),
    N_P is TamanhoProd - TamanhoElitismo,
    seleciona_elitismo(ProdutosOrd, N_P, SelecionadosProd),
    % Retém apenas o valor da avaliação (e não o produto)
     findall(Ind*V, (member(Ind*_, SelecionadosProd), member(Ind*V, Pop)), Selecionados),
    append(Elitismo, Selecionados, PopSelecionada),
    cruzamento(PopSelecionada, NPop1),
    mutacao(NPop1, NPop),
    avalia_populacao(NPop, NPopAv),
    ordena_populacao(NPopAv, NPopOrd),
	remove_duplicados(NPopOrd,ListaSemDuplicados),
   % seleciona_para_proxima_geracao([], PopMerged, PopUnicos),
  (   melhor(ListaSemDuplicados, _*MelhorValor), MelhorValor =< 20
    ->  write('Valor de aptidão de 20 alcançado.'), nl,
        write('Melhor solução encontrada: '), nl,
        write(ListaSemDuplicados), nl
    ;   N1 is N + 1,
        gera_geracao(N1, G, ListaSemDuplicados)
    )
).

gera_geracao2(G,G,Pop):-!.
gera_geracao2(N, G, Pop):-
	 get_time(CurrentTime),
    start_time(StartTime),
    TimeElapsed is CurrentTime - StartTime,
    (TimeElapsed >= 50 -> % Se o tempo limite for atingido
        write(Pop), nl
    ;
    elitismo(P),
    seleciona_elitismo(Pop, P, Elitismo),
    length(Elitismo, TamanhoElitismo),
    length(Pop, TamanhoPop),
    Restante is TamanhoPop - TamanhoElitismo,
    seleciona_restante(Pop, Restante, RestoPop),
    associa_produto(RestoPop, Produtos),
    ordena_populacao(Produtos, ProdutosOrd),
    length(ProdutosOrd, TamanhoProd),
    N_P is TamanhoProd - TamanhoElitismo,
    seleciona_elitismo(ProdutosOrd, N_P, SelecionadosProd),
    % Retém apenas o valor da avaliação (e não o produto)
     findall(Ind*V, (member(Ind*_, SelecionadosProd), member(Ind*V, Pop)), Selecionados),
    append(Elitismo, Selecionados, PopSelecionada),
    cruzamento(PopSelecionada, NPop1),
    mutacao(NPop1, NPop),
    avalia_populacao(NPop, NPopAv),
    ordena_populacao(NPopAv, NPopOrd),
	remove_duplicados(NPopOrd,ListaSemDuplicados),
   % seleciona_para_proxima_geracao([], PopMerged, PopUnicos),
  (   melhor(ListaSemDuplicados, _*MelhorValor), MelhorValor =< 20
    -> write(ListaSemDuplicados), nl
    ;   N1 is N + 1,
        gera_geracao2(N1, G, ListaSemDuplicados)
    )
).
gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	%NTemp is N+1,
	%random(1,NTemp,P11),
	%random(1,NTemp,P21),
	%P11\==P21,!,
	%((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
	findall(I, between(1, N, I), Indices),
    random_permutation(Indices, [P1|Rest]),
    member(P2, Rest),
    P1 \= P2.

gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).


cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
       cruzar(Ind1,Ind2,P1,P2,NInd1),
	  cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).



preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

%  verifica_transicoes(NInd11). criado para verificar as transições entre tarefas 
cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11),
    verifica_transicoes(NInd11).

eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

% usado (verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = Ind).
%esta difrente do orginal
mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,TempNInd),
	(verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = Ind).

% usado (verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = [G1|Ind]).
%esta difrente do orginal
mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,TempNInd),
	(verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = [G1|Ind]).

mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

% usado (verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = [G1|Ind]).
%esta difrente do orginal
mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,TempNInd),
	(verifica_transicoes(TempNInd) -> NInd = TempNInd; NInd = [G|Ind]).


%feito por nos

% Calcula a duração total de uma sequência de tarefas
duracao_total([T], Duracao) :-
    tarefa(T, Tempo, _, _),
    Duracao is Tempo.
duracao_total([T1, T2 | Ts], Duracao) :-
    tarefa(T1, Tempo, _, _),
    transicao(T1, T2, TempoTransicao),
    duracao_total([T2 | Ts], DuracaoResto),
    Duracao is Tempo + TempoTransicao + DuracaoResto.

% Encontra a sequência de tarefas com a menor duração total
melhor_sequencia(Seq, MelhorDuracao) :-
    findall(T, tarefa(T, _, _, _), Tarefas),
    permutation(Tarefas, Seq),
    duracao_total(Seq, Duracao),
    \+ (permutation(Tarefas, OutraSeq),
        duracao_total(OutraSeq, OutraDuracao),
        OutraDuracao < Duracao),
    MelhorDuracao = Duracao.


% verifica se a sequência de tarefas respeita os tempos de transição
verifica_transicoes([_]).
verifica_transicoes([T1, T2 | Resto]) :-
    transicao(T1, T2, _),
    verifica_transicoes([T2 | Resto]).

	
% Define o número de indivíduos selecionados elitistamente
elitismo(Elitismo) :-
    populacao(Tamanho),
    Elitismo is round(Tamanho * 0.2).  % 20% da população

% Seleciona os melhores P indivíduos
seleciona_elitismo([], _, []).
seleciona_elitismo(_, 0, []).
seleciona_elitismo([Ind*V|Resto], P, [Ind*V|Selecionados]) :-
    P > 0,
    P1 is P - 1,
    seleciona_elitismo(Resto, P1, Selecionados).

% Associa cada indivíduo com o produto da avaliação por um número aleatório entre 0 e 1
associa_produto([], []).
associa_produto([Ind*V|Resto], [Ind*Produto|Resto1]) :-
    random(0.0, 1.0, Rand),
    Produto is V * Rand,
    associa_produto(Resto, Resto1).

seleciona_restante(Pop, 0, Pop).
seleciona_restante(Pop, Restante, Selecionados) :-
    Restante > 0,
    associa_produto(Pop, Produtos),
    ordena_populacao(Produtos, ProdutosOrd),
    seleciona_elitismo(ProdutosOrd, Restante, SelecionadosProd),
    % Retém apenas o valor da avaliação (e não o produto)
    findall(Ind*V, (member(Ind*_, SelecionadosProd), member(Ind*V, Pop)), Selecionados).

% Remove indivíduos duplicados de uma lista
remove_duplicados([], []).
remove_duplicados([H | T], List) :-    
  member(H, T),
  remove_duplicados(T, List).
remove_duplicados([H | T], [H|T1]) :- 
  \+member(H, T),
  remove_duplicados(T, T1).

melhor([Ind], Ind).
melhor([Ind1*V1, Ind2*V2 | Resto], Melhor) :-
    (V1 > V2 -> melhor([Ind1*V1 | Resto], Melhor) ; melhor([Ind2*V2 | Resto], Melhor)).

seleciona_para_proxima_geracao(Pop, [], Pop).
seleciona_para_proxima_geracao(Pop, [Ind|Resto], NovaPop) :-
    (member(Ind, Pop) -> seleciona_para_proxima_geracao(Pop, Resto, NovaPop);
    seleciona_para_proxima_geracao([Ind|Pop], Resto, NovaPop)).
