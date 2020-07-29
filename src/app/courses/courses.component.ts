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

  
  getWeeks(date_s,date_e,index)
  {
    let d_s = new Date(date_s);
    let d_e = new Date(date_e);
    var Difference_In_Time = d_e.getTime() - d_s.getTime(); 
    let weeks = ( (Difference_In_Time) / (1000 * 60 * 60 * 24 * 7));
    this.weeks = weeks;

    CoursesComponent.coursesdata[index].weeks=this.weeks;
    return 1;
  }

  getMonthAndYear(date_s,date_e,index)
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
    console.log(this.end_month,this.end_year,this.start_month,this.start_year)
    CoursesComponent.coursesdata[index].start_month=this.start_month;
    CoursesComponent.coursesdata[index].start_year=this.start_year;
    CoursesComponent.coursesdata[index].end_month=this.end_month;
    CoursesComponent.coursesdata[index].end_year=this.end_year;

    return 1;
  }

  getStatus(start_date,end_date,indexOfelement){
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
      CoursesComponent.coursesdata[indexOfelement].text=text;
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
          if(element.category.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.title.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.instructor_name.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.description.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.estimated_workload.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.start_month.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.end_month.toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.start_year.toString().toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.end_year.toString().toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.weeks.toString().toLowerCase().includes(filter))
         {
            result.push(element);
         }
         else if(element.text.toLowerCase().includes(filter))
         {
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
