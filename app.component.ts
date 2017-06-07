import { Component } from '@angular/core';
import {JsonpModule, Jsonp} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'The Movie Database!';
    query: string;
    movies:any[];
    pager = 1;
    arr=[];

    constructor(private jsonp: Jsonp) {  }

    search() {
      if(this.query) {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=ecdf484e477ffdadf385fb7ae282d079&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(this.query)}&callback=JSONP_CALLBACK`;
         this.getGenre();
        return this.jsonp.get(url).subscribe(data => {this.movies = data.json().results;});
      }
    }
    getGenre()
    {
      if(this.query)
      {
        const link = 'https://api.themoviedb.org/3/genre/movie/list?api_key=5e831765d13944237de337da85ccb754&language=en-US&callback=JSONP_CALLBACK';

        this.jsonp.get(link).subscribe(data=> {
          console.log("inside arrow function\t data:",data.json().genres);
              this.arr=((data.json().genres));
              console.log(this.arr);
              this.arr.forEach((data) => {

                     console.log(data.name);
              });
        });
      }
    }
getGenreName(elements)
{

      const obj=[];
      console.log("inside genre name");
     console.log(this.arr);
     console.log(elements);
     elements.forEach((data)=>{

            this.arr.forEach((x)=>
          {

                if(x.id===data)
                  obj.push(x.name);
          });

     });
     return obj;
}
  favourite()
  {
    const obj=[];
    alert("Added to favourite");
    obj.push(this.movies);

  }

    onScroll()
    {
      let url = `https://api.themoviedb.org/3/search/movie?api_key=ecdf484e477ffdadf385fb7ae282d079&language=en-US&page=${++this.pager}&include_adult=false&query=${encodeURIComponent(this.query)}&callback=JSONP_CALLBACK`;
      return this.jsonp.get(url).subscribe( data => {data.json().results.forEach(element =>{ this.movies.push(element)})});
    }

}
