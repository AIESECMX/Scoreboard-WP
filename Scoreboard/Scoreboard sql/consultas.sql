-- P vs A por LC por fecha
select sum(op_plan), sum(op_ach),sum(apl_plan), sum(apl_ach),sum(app_plan), sum(app_ach),sum(re_plan), sum(re_ach), LC_name  
from operation Inner join  LC on operation.LC_idLC = LC.idLC  
where operation.year = (select Date_format(now(),'%Y'))
and operation.month = (select Date_format(now(),'%m'))
order by LC_name asc;

--P vs A por LC por programa
select sum(op_plan), sum(op_ach),sum(apl_plan), sum(apl_ach),sum(app_plan), sum(app_ach),sum(re_plan), sum(re_ach), LC_name
from operation Inner join LC on operation.LC_idLC = LC.idLC
where operation.year = (select Date_format(now(),'%Y'))
and operation.month = (select Date_format(now(),'%m'))
and operation.program_idprogram = 1;

--P vs A por MC por fecha
select sum(op_plan), sum(op_ach),sum(apl_plan), sum(apl_ach),sum(app_plan), sum(app_ach),sum(re_plan), sum(re_ach), MC_name  
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = (select Date_format(now(),'%Y'))
and operation.month = (select Date_format(now(),'%m'))
order by MC_name asc;

--CR por LC por fecha
select sum(app_plan), sum(app_ach), LC_name
from operation Inner join  LC on operation.LC_idLC = LC.idLC
where operation.year = (select Date_format(now(),'%Y'))
and operation.month = (select Date_format(now(),'%m'))
group by LC.LC_name, LC.year;

--CR por MC por fecha
select sum(app_plan), sum(app_ach), MC_name
from operation Inner join  LC on operation.LC_idLC = LC.idLC Inner join MC on LC.MC_idMC = MC.idMC
where operation.year = (select Date_format(now(),'%Y'))
and operation.month = (select Date_format(now(),'%m'))
group by MC_name ,program_idprogram;
