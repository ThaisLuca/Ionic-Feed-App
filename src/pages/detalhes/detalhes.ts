import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the DetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
  providers:[
    MoovieProvider
  ]
})
export class DetalhesPage {

  public movie;
  public movieId;

  constructor(public navCtrl: NavController, public navParams: NavParams, private moovieProvider:MoovieProvider) {
  }

  ionViewDidLoad() {
    this.movieId = this.navParams.get("id");
    this.moovieProvider.getMovieDetails(this.movieId).subscribe(data=>{
      let response = (data as any)._body;
      this.movie = JSON.parse(response);
    },
    error=>{
      console.log(error);
    })
  }

}
