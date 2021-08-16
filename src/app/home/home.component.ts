import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/internal/operators/first';
import { AccountserviceService } from '../accountservice.service';
import { User } from '../user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent implements OnInit {
  loading = false;
    users!: User[];

    constructor(private accountService: AccountserviceService) { }

    ngOnInit() {
        this.loading = true;
        this.accountService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}
