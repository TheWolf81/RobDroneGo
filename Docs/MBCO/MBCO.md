# MBCO (Minimum Business Continuity Objective)

## Caracterização do Sistema

A aplicação RobDroneGo é composta pelos seguintes módulos

* Modulo de Front-End
  * Modulo de Visualização 3D
* Modulo de Autenticação
* Modulo de Gestão de Campus
* Modulo de Planeamento
  * Módulo de Tarefas
  * Modulo de Gestão de Frota

Uma visão mais generalizada do sistema pode ser observada no seguinte diagrama:

![Diagrama do Sistema](VF.svg)

## MBCO

A aplicação RobDroneGo foi desenhada de forma a que o seu funcionamento possa ocorrer de forma parcial, havendo uma clara separação entre componentes que não são essenciais entre si. O tempo de indisponibilidade máximo foi assumido como 45 minutos.

Como tal, é inferido ao sistema um MTD (Maximum Tolerable Downtime) de 45 minutos e um MTPD (Maximum Tolerable Period of Disruption) superior ao MTD. Este valor pode ser bastante superior ao MTD, uma vez que os componentes em baixo não são necessários, de todo, para a grande maioria das funcionalidades requeridas. o MTD é assumido como um valor estático.

Numa situação de funcionamento parcial do sistema(MTPD), os seguintes módulos deves estar operacionais:

* Módulo Front-End -> Módulo responsável pela interação dos utilizadores com o sistema.
* Módulo Gestão de Campus - Módulo responsável pela gestão de edifícios do campus.
* Módulo de Planeamento - Módulo responsável pelo planeamento de trajetos e .
  * Módulo de Tarefas - Módulo responsável pelas tarefas que os robots e drones podem efetuar.
  * Módulo Gestão de Frota - Módulo responsável pela gestão de robots e drones.
* Modulo de Autenticação - Módulo responsável pela autenticação de utilizadores do sistema.

Estes módulos podem ser considerados módulos essenciais ao sistema, sendo que os Módulo de Tarefas e Gestão de Frota podem ser considerados integrados no Módulo de Planeamento. O Módulo de Planeamento também necessita do Módulo de Gestão de Campos, de forma a obter informações sobre os edificios e pisos.

Estes módulos podem ser considerados módulos principais, essenciais ao sistema.

Os restantes módulos, não são necessários ao funcionamento parcial do sistema, pelo que podem estar inoperacionais durante o periodo de disrupção.

* Módulo de Visualização 3D -> Módulo responsável pela visualização 3D dos pisos de edificios, robots e drones.

O Modulo de Visualização 3D, apesar de estar integrado no módulo Front-End, permite apenas que os utilizadores observem os pisos e os robots/drones num ambiente 3D. Não necessita de estar operacional para, por exemplo, realizar uma tarefa com um robot. Não influencia a operacionalidade dos restantes módulos.

Este módulo pode ser considerado secundário, uma vez que não é essencial ao sistema.
