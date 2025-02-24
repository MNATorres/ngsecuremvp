import { Component } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private projectService: ProjectsService) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => {});
  }
}
