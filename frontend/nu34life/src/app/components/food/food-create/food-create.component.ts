import {Component, OnInit} from '@angular/core';
import {Food} from '../../../model/food';
import {NutritionFact} from '../../../model/nutrition-fact';
import {AwsService} from '../../../service/aws.service';
import {ApiService} from '../../../service/api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-food-create',
  templateUrl: './food-create.component.html',
  styleUrls: ['./food-create.component.scss']
})
export class FoodCreateComponent implements OnInit {

  file: string;
  food: Food;
  fact: NutritionFact;

  errors: string[];

  constructor(private apiService: ApiService,
              private awsService: AwsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.food = new Food();
    this.food.nutrFact = new NutritionFact();
  }

  fileEvent(input) {
    this.file = this.awsService.uploadFile(input.target.files);
    console.log(this.file);
  }

  saveFood() {
    this.food.image = this.file;
    this.food.createdBy = 0;
    console.log(JSON.stringify(this.food, null, 2));
    this.apiService.postFood(this.food).subscribe(food => {
      this.router.navigate(['/foods']);
    }, err => {
      this.errors = err.error.erros as string [];
      console.error('Código del error desde el backend: ' + err.status);
      console.error(err.error.errors);
    });
  }

  cancel() {
    this.router.navigate(['/foods']);
  }
}