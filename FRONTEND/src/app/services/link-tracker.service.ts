import { Injectable } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkTrackerService {

  private visitedLinks: Set<string> = new Set<string>();
  private visitedLinksSubject: Subject<string> = new Subject<string>();

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.visitedLinks.add(event.urlAfterRedirects);
        this.visitedLinksSubject.next(event.urlAfterRedirects);
      }
    });
  }

  getVisitedLinks(): Observable<string> {
    return this.visitedLinksSubject.asObservable();
  }
}
