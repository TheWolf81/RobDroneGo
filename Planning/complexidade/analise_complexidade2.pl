

:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:- use_module(library(lists)).

% tarefa(Id,TempoProcessamento,TempConc,PesoPenalizacao).
tarefa(t1,2,5,1).
tarefa(t2,4,7,6).
tarefa(t3,1,11,2).
tarefa(t4,5,3,1).
tarefa(t5,3,8,5).
tarefa(t6,2,5,1).
tarefa(t7,4,7,6).
tarefa(t8,1,11,2).
tarefa(t9,5,3,1).

% transicao(Tarefa1,Tarefa2,TempoTransicao).
transicao(t1, t2, 3).
transicao(t2, t1, 12).
transicao(t1, t3, 4).
transicao(t3, t1, 5).
transicao(t1, t4, 2).
transicao(t4, t1, 1).
transicao(t1, t5, 3).
transicao(t5, t1, 2).
transicao(t1, t6, 4).
transicao(t6, t1, 3).
transicao(t1, t7, 2).
transicao(t7, t1, 1).
transicao(t1, t8, 3).
transicao(t8, t1, 2).
transicao(t1, t9, 4).
transicao(t9, t1, 3).
transicao(t2, t3, 28).
transicao(t3, t2, 1).
transicao(t2, t4, 3).
transicao(t4, t2, 26).
transicao(t2, t5, 45).
transicao(t5, t2, 3).
transicao(t2, t6, 54).
transicao(t6, t2, 41).
transicao(t2, t7, 2).
transicao(t7, t2, 1).
transicao(t2, t8, 3).
transicao(t8, t2, 2).
transicao(t2, t9, 4).
transicao(t9, t2, 3).
transicao(t3, t4, 44).
transicao(t4, t3, 60).
transicao(t3, t5, 2).
transicao(t5, t3, 1).
transicao(t3, t6, 3).
transicao(t6, t3, 2).
transicao(t3, t7, 4).
transicao(t7, t3, 3).
transicao(t3, t8, 5).
transicao(t8, t3, 4).
transicao(t3, t9, 3).
transicao(t9, t3, 2).
transicao(t4, t5, 3).
transicao(t5, t4, 21).
transicao(t4, t6, 44).
transicao(t6, t4, 35).
transicao(t4, t7, 2).
transicao(t7, t4, 1).
transicao(t4, t8, 3).
transicao(t8, t4, 2).
transicao(t4, t9, 4).
transicao(t9, t4, 3).
transicao(t5, t6, 22).
transicao(t6, t5, 10).
transicao(t5, t7, 3).
transicao(t7, t5, 2).
transicao(t5, t8, 4).
transicao(t8, t5, 3).
transicao(t5, t9, 5).
transicao(t9, t5, 4).
transicao(t6, t7, 4).
transicao(t7, t6, 3).
transicao(t6, t8, 5).
transicao(t8, t6, 4).
transicao(t6, t9, 3).
transicao(t9, t6, 2).
transicao(t7, t8, 3).
transicao(t8, t7, 2).
transicao(t7, t9, 4).
transicao(t9, t7, 3).
transicao(t8, t9, 5).
transicao(t9, t8, 4).

tarefas(9).

% parameteriza��o
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			(retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), 	asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).


gera(TSol):-
	inicializa,
    get_time(Ti),
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd),
    get_time(Tf),
    TSol is Tf - Ti.

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
avalia([T],_,V):-
	tarefa(T,Dur,Prazo,Pen),
	V is Dur.
avalia([T1, T2|Resto],_,V):-
	tarefa(T1,Dur,Prazo,Pen),
	transicao(T1, T2, TempoTransicao),
    VT is Dur + TempoTransicao,
	avalia([T2|Resto],InstFim,VResto),
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


gera_geracao(G,G,Pop):-!,
	write('Gera��o '), write(G), write(':'), nl, write(Pop), nl.

gera_geracao(N,G,Pop):-
	write('Gera��o '), write(N), write(':'), nl, write(Pop), nl,
	cruzamento(Pop,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	ordena_populacao(NPopAv,NPopOrd),
	N1 is N+1,
	gera_geracao(N1,G,NPopOrd).

gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).
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
melhor_sequencia(Seq, MelhorDuracao,TSol) :-
    get_time(Ti),
    findall(T, tarefa(T, _, _, _), Tarefas),
    permutation(Tarefas, Seq),
    duracao_total(Seq, Duracao),
    \+ (permutation(Tarefas, OutraSeq),
        duracao_total(OutraSeq, OutraDuracao),
        OutraDuracao < Duracao),
    MelhorDuracao = Duracao,
    get_time(Tf),
    TSol is Tf-Ti.

    % verifica se a sequência de tarefas respeita os tempos de transição
verifica_transicoes([_]).
verifica_transicoes([T1, T2 | Resto]) :-
    transicao(T1, T2, _),
    verifica_transicoes([T2 | Resto]).