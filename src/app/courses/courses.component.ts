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
          cat.coursesdata=JSON.parse(myArr.payload);
          console.log("cat.courses",typeof(cat.courses), cat.courses)
        }
      };
      this.xmlhttp.open("GET", this.url, true);
      this.xmlhttp.send();

      
  }

  public courses:any;
  coursesdata:any;
  courselength;
  text:string;
  xmlhttp = new XMLHttpRequest();
  url = "../assets/scripts/all_courses.json";

 

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
    
      var result=[];var temp=[];
      if(category!=="")
      {
        for (let index = 0; index < this.coursesdata.length; index++) {
          const element = this.coursesdata[index];
          if(element.category==category)
          {
             temp.push(element);
          }
        }
      }
      else
      {
          temp=this.coursesdata;
      }
     
      if(filter!=undefined && filter!="")
      {
        alert(category+" cf  "+filter)
        for (let index = 0; index < temp.length; index++) {
          const element = temp[index];
          if(element.category.includes(filter))
         {
            result.push(element);
         }
         else if(element.title.includes(filter))
         {
            result.push(element);
         }
         else if(element.instructor_name.includes(filter))
         {
            result.push(element);
         }
         else if(element.description.includes(filter))
         {
            result.push(element);
         }
         else if(element.estimated_workload.includes(filter))
         {
            result.push(element);
         }
         else if(element.start_date.includes(filter))
         {
            result.push(element);
         }
         else if(element.end_date.includes(filter))
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
      return result;
  }

  
}
