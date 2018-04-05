import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { DetalhesPage } from '../detalhes/detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MoovieProvider
  ]
})
export class FeedPage {

  public nome_usuario: string = "Thais"

  public movies_list = new Array<any>();
  public loading;
  public refresher;
  public isRefreshing: boolean = false;
  public page = 1;
  public infinteScroll;

  public objeto_feed = {
    titulo: "Thais",
    data: "November 5, 1955",
    descricao: "Wait a minute. Wait a minute, Doc. Uhhh...",
    likes: 12,
    comments: 4,
    time: "11h ago"
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, private moovieProvider: MoovieProvider, public loadingController: LoadingController) {
  }

  public soma_numeros(numero1: number, numero2: number): void {
    alert("OLÁÁÁÁÁÁÁÁÁ");
    alert(numero1 + numero2)
  }

  presentLoadingText() {
    this.loading = this.loadingController.create({
      content: 'Carregando filmes..'
    });
    this.loading.present();
  }

  closeLoading() {
    this.loading.dismiss();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefreshing = true;
    this.loadMovies();
  }

  ionViewDidEnter() {
    this.loadMovies();
  }

  loadMovies(newPage: boolean = false) {
    this.presentLoadingText();
    this.moovieProvider.getLatestMovies(this.page).subscribe(
      data => {
        const response = (data as any);
        const object = JSON.parse(response._body);
        if (newPage) {
          this.movies_list = this.movies_list.concat(object.results);
          this.infinteScroll.complete();
        } else {
          this.movies_list = object.results;
        }
        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
          this.isRefreshing = false;
        }
      },
      error => {
        console.log(error);
        this.closeLoading();
        if (this.isRefreshing) {
          this.refresher.complete();
        }
      })
  }

  abrirDetalhes(movie) {
    this.navCtrl.push(DetalhesPage, { id: movie.id });
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.infinteScroll = infiniteScroll;
    this.loadMovies(true);
  }

}
