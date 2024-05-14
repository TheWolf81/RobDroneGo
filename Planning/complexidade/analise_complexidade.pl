:-dynamic node/3.
:-dynamic edge/3.
:-dynamic nlin/1.
:-dynamic melhor_sol_dfs/2.

cria_matriz:-
    retractall(node(_, _, _)),
    retractall(edge(_, _, _)),
    write('Numero de Colunas: '), read(NCol), nl,
    write('Numero de Linhas: '), read(NLin), nl,
    asserta(nlin(NLin)),
    cria_matriz_0(NCol, NLin,0),
    % Outras ações, se necessário
    gerar_grafo(NCol, NLin),
    retract(nlin(_)).

cria_matriz_0(1,1,I):-!,asserta(node(I,1,1)).
cria_matriz_0(NCol,1,I):-!,asserta(node(I,NCol,1)),I2 is I+1,NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin,I2).
cria_matriz_0(NCol,NLin,I):-asserta(node(I,NCol,NLin)),NLin1 is NLin-1,I2 is I+1,cria_matriz_0(NCol,NLin1,I2).

gerar_grafo(_,0):-!.
gerar_grafo(Col,Lin):-
  gerar_linha_grafo(Col,Lin),
  Lin1 is Lin-1,
  gerar_grafo(Col,Lin1).

gerar_linha_grafo(0,_):-!.

gerar_linha_grafo(Col,Lin):-
  node(Id1,Col,Lin),
  !,
  verificar_vizinhos(Id1, Col, Lin),
  Col1 is Col-1,
  gerar_linha_grafo(Col1,Lin),!.

gerar_linha_grafo(Col,Lin):-
  Col1 is Col-1,gerar_linha_grafo(Col1,Lin).

verificar_vizinhos(Id1, Col, Lin):-
  ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
  ((node(Id2,ColS,Lin), assertz(edge(Id1, Id2, 1));true)), % Verifca à direita.
  ((node(Id3,ColA,Lin), assertz(edge(Id1, Id3, 1));true)), % Verifca à esquerda.
  ((node(Id4,Col,LinS), assertz(edge(Id1, Id4, 1));true)), % Verifica abaixo.
  ((node(Id5,Col,LinA), assertz(edge(Id1, Id5, 1));true)), % Verifica acima.
  C is 1,
  ((node(Id6,ColS,LinA), assertz(edge(Id1, Id6, C));true)), % Verifica diagonal superior direita.
  ((node(Id7,ColA,LinA), assertz(edge(Id1, Id7, C));true)), % Verifica diagonal superior esquerda.
  ((node(Id8,ColS,LinS), assertz(edge(Id1, Id8, C));true)), % Verifica diagonal inferior direita.
  ((node(Id9,ColA,LinS), assertz(edge(Id1, Id9, C));true)). % Verifica diagonal inferior esquerda.

dfs(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    dfs2(Orig,Dest,[Orig],Cam,Custo2),Custo is Custo2,
    get_time(Tf),
    TSol is Tf-Ti,
    write(Cam).

dfs2(Dest,Dest,LA,Cam,0):-
    reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,Custo):-edge(Act,X, CustoA),\+ member(X,LA),
    dfs2(X,Dest,[X|LA],Cam,Custo2),Custo is CustoA + Custo2.

bfs(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    bfs2(Dest,[[Orig]],Cam,Custo),
    get_time(Tf),
    TSol is Tf-Ti,
    write(Cam).

bfs2(Dest,[[Dest|T]|_],Cam,Custo):-
    reverse([Dest|T],Cam),
    length(Cam, Custo).

bfs2(Dest,[LA|Outros],Cam,Custo):-
    LA=[Act|_],
    findall([X|LA],
    (Dest\==Act,edge(Act,X,_),\+ member(X,LA)),
    Novos),
    append(Outros,Novos,Todos),
    bfs2(Dest,Todos,Cam,Custo).

aStar(Orig,Dest,Cam,Custo,TSol):-
    get_time(Ti),
    aStar2(Dest,[(_,0,[Orig])],Cam,Custo),
    get_time(Tf),
    TSol is Tf-Ti,
    write(Cam).

aStar2(Dest,[(_,Custo,[Dest|T])|_],Cam,Custo):-
	reverse([Dest|T],Cam).

aStar2(Dest,[(_,Ca,LA)|Outros],Cam,Custo):-
	LA=[Act|_],
	findall((CEX,CaX,[X|LA]),
		(Dest\==Act,edge(Act,X,CustoX),\+ member(X,LA),
		CaX is CustoX + Ca, estimativa(X,Dest,EstX),
		CEX is CaX +EstX),Novos),
	append(Outros,Novos,Todos),
	sort(Todos,TodosOrd),
	aStar2(Dest,TodosOrd,Cam,Custo).


estimativa(Nodo1,Nodo2,Estimativa):-
	node(Nodo1,X1,Y1),
	node(Nodo2,X2,Y2),
	Estimativa is sqrt((X1-X2)^2+(Y1-Y2)^2).
