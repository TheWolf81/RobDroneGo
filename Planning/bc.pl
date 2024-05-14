%liga(a,b).
%liga(b,c).

%pisos(a, [a1,a2]).
%pisos(b, [b1,b2,b3]).
%pisos(c, [c1,c2]).

%corredor(a,b,a2,b2).
%corredor(b,c,b2,c2).

%elevador(a, [a1,a2]).
%elevador(b, [b1,b2,b3]).
%elevador(c, [c1,c2]).


corr_pos(a2b2,23,6,a2).
corr_pos(a2b2,23,7,a2).

corr_pos(b2a2,1,7,b2).
corr_pos(b2c3,25,11,b2).
corr_pos(b2c3,25,12,b2).
corr_pos(b2d3,23,13,b2).
corr_pos(b2d3,24,13,b2).

corr_pos(b3c4,25,11,b3).
corr_pos(b3c4,25,12,b3).

corr_pos(c2d2,1,15,c2).
corr_pos(c2d2,1,16,c2).

corr_pos(c3b2,1,10,c3).
corr_pos(c3d3,1,16,c3).

corr_pos(c4b3,1,10,c4).
corr_pos(c4b3,1,11,c4).

corr_pos(d2c2,13,1,d2).
corr_pos(d2c2,13,2,d2).

corr_pos(d3b2,9,1,d3).
corr_pos(d3b2,10,1,d3).
corr_pos(d3c3,13,1,d3).
corr_pos(d3c3,13,2,d3).

%corr_pos(b2a2,1,7,b2).
%corr_pos(b2c2,25,12,b2).
%corr_pos(c2b2,1,10,c2).

elev_pos(ea1,22,1,a1).
elev_pos(ea2,22,1,a2).

elev_pos(eb1,25,10,b1).
elev_pos(eb2,25,9,b2).
elev_pos(eb3,25,10,b3).

elev_pos(ec1,1,14,c1).
elev_pos(ec2,1,11,c2).
elev_pos(ec3,1,14,c3).
elev_pos(ec4,1,13,c4).

elev_pos(ed1,1,2,d1).
elev_pos(ed2,1,2,d2).
elev_pos(ed3,1,2,d3).




%elev_pos(eb1,24,9,b1).
%elev_pos(eb2,24,9,b2).
%elev_pos(eb3,23,10,b3).
%elev_pos(ec1,3,13,c1).
%elev_pos(ec2,3,13,c2).

sala_pos(apn,10,4,a1).

sala_pos(a201,19,3,a2).
sala_pos(a202,21,3,a2).
sala_pos(a203,9,5,a2).
sala_pos(a204,11,5,a2).
sala_pos(a205,14,5,a2).
sala_pos(a206,5,5,a2).
sala_pos(a207,9,8,a2).
sala_pos(a208,12,8,a2).
sala_pos(a209,20,9,a2).

sala_pos(b101,3,5,b1).
sala_pos(b102,7,5,b1).
sala_pos(b103,15,5,b1).
sala_pos(b104,21,5,b1).
sala_pos(b105,3,9,b1).
sala_pos(b106,19,9,b1).
sala_pos(b107,7,10,b1).
sala_pos(b108,21,11,b1).

sala_pos(b201,13,4,b2).
sala_pos(b202,21,5,b2).
sala_pos(b203,19,6,b2).
sala_pos(b204,7,7,b2).

sala_pos(b301,4,1,b3).
sala_pos(b302,6,1,b3).
sala_pos(b303,12,1,b3).
sala_pos(b304,14,11,b3).

sala_pos(c101,5,2,c1).
sala_pos(c102,8,2,c1).
sala_pos(c103,5,6,c1).
sala_pos(c104,8,6,c1).
sala_pos(c105,8,10,c1).
sala_pos(c106,8,14,c1).
sala_pos(c107,5,18,c1).
sala_pos(c108,8,18,c1).

sala_pos(c201,4,1,c2).
sala_pos(c202,4,3,c2).
sala_pos(c203,8,4,c2).
sala_pos(c204,10,6,c2).
sala_pos(c205,4,10,c2).
sala_pos(c206,2,10,c2).
sala_pos(c207,12,11,c2).
sala_pos(c208,7,14,c2).
sala_pos(c209,3,17,c2).

sala_pos(c301,6,5,c3).
sala_pos(c302,4,6,c3).
sala_pos(c303,7,6,c3).
sala_pos(c304,12,11,c3).
sala_pos(c305,2,12,c3).
sala_pos(c306,12,15,c3).
sala_pos(c307,3,17,c3).
sala_pos(c308,6,17,c3).
sala_pos(c309,10,17,c3).

sala_pos(c401,7,5,c4).
sala_pos(c402,5,6,c4).
sala_pos(c403,7,7,c4).
sala_pos(c404,2,12,c4).
sala_pos(c405,7,14,c4).

sala_pos(d101,2,1,d1).
sala_pos(d102,11,3,d1).
sala_pos(d103,2,4,d1).
sala_pos(d104,7,7,d1).
sala_pos(d105,4,10,d1).
sala_pos(d106,7,12,d1).
sala_pos(d107,4,14,d1).
sala_pos(d108,7,18,d1).

sala_pos(d201,2,1,d2).
sala_pos(d202,4,3,d2).
sala_pos(d203,4,9,d2).
sala_pos(d204,7,9,d2).
sala_pos(d205,4,14,d2).
sala_pos(d206,8,14,d2).
sala_pos(d207,7,18,d2).

sala_pos(d301,2,1,d3).
sala_pos(d302,4,7,d3).
sala_pos(d303,8,7,d3).
sala_pos(d304,4,10,d3).
sala_pos(d305,8,10,d3).
sala_pos(d306,7,17,d3).	



%sala_pos(a201,6,6,a2).
%sala_pos(a203,9,5,a2).
%sala_pos(a205,11,5,a2).
%sala_pos(a207,15,5,a2).
%sala_pos(a209,19,3,a2).
%sala_pos(a202,9,8,a2).
%sala_pos(a204,13,8,a2).
%sala_pos(a206,17,8,a2).
%sala_pos(b101,3,5,b1).
%sala_pos(b103,7,5,b1).
%sala_pos(b105,15,5,b1).
%sala_pos(b106,21,5,b1).
%sala_pos(b102,3,9,b1).
%sala_pos(b106,18,9,b1).
%sala_pos(b104,8,11,b1).
%sala_pos(b106,21,11,b1).
%sala_pos(b203,8,8,b2).
%sala_pos(b202,14,5,b2).
%sala_pos(b205,20,7,b2).
%sala_pos(b207,21,5,b2).
%sala_pos(b301,5,2,b3).
%sala_pos(b303,7,2,b3).
%sala_pos(b205,13,2,b3).
%sala_pos(b302,14,10,b3).
%sala_pos(c101,6,3,c1).
%sala_pos(c103,6,7,c1).
%sala_pos(c105,6,19,c1).
%sala_pos(c102,9,19,c1).
%sala_pos(c104,9,15,c1).
%sala_pos(c106,9,11,c1).
%sala_pos(c108,9,7,c1).
%sala_pos(c110,9,3,c1).
%sala_pos(c201,5,7,c2).
%sala_pos(c204,8,7,c2).
%sala_pos(c202,6,5,c2).
%sala_pos(c206,12,11,c2).
%sala_pos(c208,12,15,c2).
%sala_pos(c210,10,17,c2).
%sala_pos(c205,6,17,c2).
%sala_pos(c203,3,17,c2).
