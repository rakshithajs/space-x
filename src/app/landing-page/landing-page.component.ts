import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  /**
   * ng serve --host=0.0.0.0
   * VIEWPORT
   * SEMANTIC HTML
   * angular universal
   */
  minYear = 2006;
  maxYear = 2019;
  years = [];
  spaceXdataArray: any = [];
  filter: any = {};

  constructor(private http: HttpService) { }

  ngOnInit() {
    for (let i = this.minYear; i <= this.maxYear; i++) {
      this.years.push(i.toString());
    }
    this.getInitialData();
  }

  getInitialData(filter: any = {}) {
    this.http.get('https://api.spacexdata.com/v3/launches?limit=8', filter).subscribe(
      (response: any) => {
        console.log('resp-=', response);
        this.spaceXdataArray = [];
        if (response.length) {
          response.forEach((item) => {
            const temp: any = {};

            temp.image = (item.links) ? item.links.mission_patch_small || '' : '';
            temp.missionName = item.mission_name;
            temp.flightNo = item.flight_number;
            temp.missionIds = item.mission_id || [];
            temp.launchYear = item.launch_year || 'N/A';
            temp.launchSuccess = item.hasOwnProperty('launch_success') ? item.launch_success : 'N/A';
            temp.launchLanding = item.hasOwnProperty('launch_launding') ? item.launch_launding : 'N/A';

            this.spaceXdataArray.push(temp);
          });
        }
      },
      (err: any) => {
        console.log('Error Occurred ==> ', err);
      }
    );
    // https://api.spacexdata.com/v3/launches?limit=100
  }

  setFilter(type = 0, value: any = '') {
    if (type == 0) { // year
      this.filter.launch_year = value;
    } else if (type == 1) { // launch
      this.filter.launch_success = value;
    } else { // land
      this.filter.land_success = value;
    }
    this.getInitialData(this.filter);
  }
}
