import { InteractionService } from './../interaction.service';
import { CategoriesService } from './../categories.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService:CategoriesService,private interactionService:InteractionService) { 
        console.log("filter",this.filter);
  }

  ngOnInit(): void {
      var cat = this;
      this.xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var myArr = JSON.parse(this.responseText);
          cat.categories=JSON.parse(myArr.payload);
          console.log("cat.categories",typeof(cat.categories), cat.categories)
          
        }
      };
      this.xmlhttp.open("GET", this.url, true);
      this.xmlhttp.send();

      
     
  }
  public categories:any;
  xmlhttp = new XMLHttpRequest();
  url = "../assets/scripts/all_categories.json";
  filter:any;
  category:any="";
  getValue(item:string){
      
      this.category=item;
      //alert("this.fiter"+this.filter)
      if(this.filter=="" || this.filter==undefined)
      {
        const jsonmsg={type:"category",category:item,filter:""};
        this.interactionService.sendMessage(JSON.stringify(jsonmsg));
      }
      else
      {
        const jsonmsg={type:"category",category:item,filter:this.filter};
        this.interactionService.sendMessage(JSON.stringify(jsonmsg));
      }
      
      console.log("item",typeof(item), item);
  }
    
  onInput(value: string) {
      console.log(value);
    
      if(this.category=="" || this.category==undefined)
      {
        const jsonmsg={type:"filter",filter:value,category:""};
        this.interactionService.sendMessage(JSON.stringify(jsonmsg));
      }
      else
      {
        const jsonmsg={type:"filter",filter:value,category:this.category}
        this.interactionService.sendMessage(JSON.stringify(jsonmsg));
      }
      
      //alert(this.check())
  }

  
}
