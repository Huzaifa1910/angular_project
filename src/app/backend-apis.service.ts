import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackendApisService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {}

  register(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/business/register`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  login(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/employee/login`, payload).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  private getAuthHeaders(): { headers: { Authorization: string } } {
    const token = sessionStorage.getItem('access_token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  getDataWithAuth(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  add_project(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/project/add`, payload, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_all_leaders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/p_leader_options`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_all_projects(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get_all_projects`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  add_employee(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/employees`, payload, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  uploadDocuments(files: File[], additionalData: any): Observable<any> {
    const formData: FormData = new FormData();
  
    // Append files
    files.forEach(file => {
      formData.append('file', file, file.name);
    });
  
    // Append additional data (e.g., project ID, description, etc.)
    Object.keys(additionalData).forEach(key => {
      formData.append(key, additionalData[key]);
    });
    return this.http.post(`${this.baseUrl}/api/documents/upload`, formData, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  getProjectEmployees(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/projects/${projectId}/employees`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_projects_by_business(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/projects`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_documents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/member/documents`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_employees_by_role(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/employees_by_role`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }

  get_profile_details(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/profile`, this.getAuthHeaders()).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error
          this.router.navigate(['/logout']);
        }
        return throwError(error);
      })
    );
  }
}
