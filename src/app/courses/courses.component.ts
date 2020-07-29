import { element } from 'protractor';
import { InteractionService } from './../interaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(private interactionService:InteractionService) { 
    this.interactionService.category$.subscribe(message=>{
      console.log("courses",message);
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
          }
          cat.courses=CoursesComponent.coursesdata;
          console.log("cat.courses",typeof(cat.courses), cat.courses)
        }
      };
      this.xmlhttp.open("GET", this.url, true);
      this.xmlhttp.send();

      
  }

  courses:any;
  static coursesdata:any;
  courselength;
  text:string;
  xmlhttp = new XMLHttpRequest();
  url = "../assets/scripts/all_courses.json";
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

    return this.weeks+" ";
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

    return this.start_month+" , "+ this.start_year + this.end_month+" , "+this.end_year;
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
  searchByCategoryAndFilter(category,filter)
  {
    
      let result=[];let temp=[];
      
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
     
      if(filter!=undefined || filter!="")
      {
        filter=filter.toLowerCase();
        for (let index = 0; index < temp.length; index++) {
          const element = temp[index];
          console.log("sada",element.estimated_workload.toLowerCase().includes(filter));
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
         else if(document.getElementById('desc'+index) && document.getElementById('desc'+index).textContent.toLowerCase().includes(filter))
         {
          console.log("desc",index);
            result.push(element);
         }
         else if(element.estimated_workload.toLowerCase().includes(filter))
         {
          console.log("e wl",index);
            result.push(element);
         }
         else if(element.duration.toLowerCase().includes(filter))
         {
           console.log("duration",index);
            result.push(element);
         }
         else if(element.weeks.toString().toLowerCase().includes(filter))
         {
          console.log("weeks",index);
            result.push(element);
         }
         else if(element.text.toLowerCase().includes(filter))
         {
          console.log("text",index);
            result.push(element);
         }

         }
         console.log("result",result);
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
