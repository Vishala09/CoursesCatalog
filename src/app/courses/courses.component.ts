import { element } from 'protractor';
import { InteractionService } from './../interaction.service';
import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { identifierModuleUrl } from '@angular/compiler';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private interactionService:InteractionService) { 
    this.interactionService.category$.subscribe(message=>{
      console.log("courses page:-",message);
      const jsonmsg=JSON.parse(message)
   
        this.searchByCategoryAndFilter(jsonmsg.category,jsonmsg.filter);
      
      })

  }

  ngOnInit(): void {
    var cat = this;
      this.xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          cat.courses=JSON.parse(myArr.payload);
          cat.courselength=cat.courses.length;
          CoursesComponent.coursesdata=JSON.parse(myArr.payload);
          for(let i=0;i<CoursesComponent.coursesdata.length;i++)
          {
            const element=CoursesComponent.coursesdata[i];
            CoursesComponent.coursesdata[i].duration=cat.getMonthAndYear(element.start_date,element.end_date);
            CoursesComponent.coursesdata[i].weeks=cat.getWeeks(element.start_date,element.end_date);
            CoursesComponent.coursesdata[i].text=cat.getStatus(element.start_date,element.end_date);
            CoursesComponent.coursesdata[i].id="id"+i;
          }
          cat.courses=CoursesComponent.coursesdata;
          console.log("cat.courses",typeof(cat.courses), cat.courses)
        }
      };
      this.xmlhttp.open("GET", this.url, true);
      this.xmlhttp.send();

      
  }

  courses:Course[];
  static coursesdata:Course[];
  courselength;
  text:string;
  xmlhttp = new XMLHttpRequest();
  url = "../assets/scripts/all_courses.js";
  start_month:string;
  start_year;
  end_month:string;
  end_year;
  weeks;


  getWeeks(date_s,date_e)
  {
    let d_s = new Date(date_s);
    let d_e = new Date(date_e);
    var Difference_In_Time = d_e.getTime() - d_s.getTime(); 
    let weeks = ( (Difference_In_Time) / (1000 * 60 * 60 * 24 * 7));
    this.weeks = weeks;

    return this.weeks;
  }

  getMonthAndYear(date_s,date_e)
  {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const d_s = new Date(date_s);
    this.start_month= monthNames[d_s.getMonth()];
    this.start_year= d_s.getFullYear();

    const d_e = new Date(date_e);
    this.end_month= monthNames[d_e.getMonth()];
    this.end_year= d_e.getFullYear();

    return this.start_month+" , "+ this.start_year +" - "+ this.end_month+" , "+this.end_year;
  }

  getStatus(start_date,end_date){
      var sd=new Date(start_date);
      var ed=new Date(end_date);
      var td=new Date();
      var text;
      if(td<sd)
      {
        text="Pre registration";
      }
      else if(sd<=td && td<=ed)
      {
          text="Ongoing"
      }
      else
      {
          text="Completed"
      }
      this.text=text;
      return text;
  }

  removeTags(str) { 
    if ((str===null) || (str==='')) 
        return false; 
    else
        str = str.toString();  
        return str.replace( /(<([^>]+)>)/ig, ''); 
      } 

  searchByCategoryAndFilter(category,filter)
  {
    
      let result=new Array();let temp=new Array();
      console.log("Search function:-",category,filter,result,temp)
      if(category!="All")
      {
        for (let index = 0; index < CoursesComponent.coursesdata.length; index++) {
          const element = CoursesComponent.coursesdata[index];
          if(element.category==category)
          {
             temp.push(element);
          }
        }
      }
      else
      { 
          temp=CoursesComponent.coursesdata;
      }
      console.log("temp",temp)
      if(filter!=undefined || filter!="")
      {
        filter=filter.toLowerCase();
        
        for (let index = 0; index < temp.length; index++) {
          const element = temp[index];
          element.time=element.weeks+" week course , "+element.estimated_workload;
         if(element.title.toLowerCase().includes(filter))
         {
           console.log("title",index);
            result.push(element);
         }
         else if(element.instructor_name.toLowerCase().includes(filter))
         {
          console.log("instructor",index);
            result.push(element);
         }
         else if(this.removeTags(element.description.toLowerCase()).includes(filter))
         {
           //document.getElementById('desc'+element.id) && document.getElementById('desc'+element.id).textContent.toLowerCase().includes(filter)
          console.log("desc",index);
            result.push(element);
         }
         else if(element.duration.toLowerCase().includes(filter))
         {
           console.log("duration",index);
            result.push(element);
         }
         else if(element.time.toString().toLowerCase().includes(filter))
         {
          console.log("weeks or est wl",index);
            result.push(element);
         }
         else if(element.text.toLowerCase().includes(filter))
         {
          console.log("text",index);
            result.push(element);
         }

         }
         console.log("result");
      }
      else
      {
         result=temp;
      }
      this.courses=result;
      this.courselength=result.length;
      console.log(this.courses);
      //return result;
  }

  
}
