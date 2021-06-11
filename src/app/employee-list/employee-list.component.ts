import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { EmployeeService } from '../shared/employee.service';
import { EmployeeModel } from './employee-list.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  empformValue !:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  empData!:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  constructor(private formbuilder:FormBuilder,private empService:EmployeeService) { }

  ngOnInit(): void {
    this.empformValue=this.formbuilder.group({
      id:[''],
      name:[''],
      code:[''],
      designation:[''],
      salary:['']
    })
    this.getAllEmp();
    this.showAdd=false;
    this.showUpdate=false;
  }

  postEmp(){
    this.employeeModelObj.id=this.empformValue.value.id;
    this.employeeModelObj.name=this.empformValue.value.name;
    this.employeeModelObj.code=this.empformValue.value.code;
    this.employeeModelObj.designation=this.empformValue.value.designation;
    this.employeeModelObj.salary=this.empformValue.value.salary;
    this.empService.postEmployee(this.employeeModelObj)
    .subscribe(res=>{
        console.log(res);
        alert("Employee added");
        let ref=document.getElementById("cancel");
        ref.click();
        this.empformValue.reset();
        this.getAllEmp();
    },
    Error=>{
      alert("Error while adding Employee");
    }
    )
  }

  getAllEmp()
  {
    this.empService.getEmployee()
    .subscribe(res=>{
      this.empData=res;
    },
    Error=>{
      alert("Error while fetching records.")
    }
    )
  }

  deleteEmp(row:any)
  {
    this.empService.deleteEmployee(row.id)
    .subscribe(res=>{
      alert("Employee deleted");
      this.getAllEmp();
    },
    Error=>{
      alert("Error while fetching records.")
    }
    )
  }
  onAddClick()
  {
    this.empformValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
  }
  onEditEmp(row:any){
    this.showUpdate=true;
    this.showAdd=false;
    this.empformValue.controls['id'].setValue(row.id);
    this.empformValue.controls['name'].setValue(row.name);
    this.empformValue.controls['code'].setValue(row.code);
    this.empformValue.controls['designation'].setValue(row.designation);
    this.empformValue.controls['salary'].setValue(row.salary);
  }
  updateEmp(){
    this.employeeModelObj.id=this.empformValue.value.id;
    this.employeeModelObj.name=this.empformValue.value.name;
    this.employeeModelObj.code=this.empformValue.value.code;
    this.employeeModelObj.designation=this.empformValue.value.designation;
    this.employeeModelObj.salary=this.empformValue.value.salary;
    this.empService.putEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res=>{
        console.log(res);
        alert("Employee Updated");
        let ref=document.getElementById("cancel");
        ref.click();
        this.empformValue.reset();
        this.getAllEmp();
    },
    Error=>{
      alert("Error while adding Employee");
    }
    )
  }
}
