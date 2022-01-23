import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { AddStudentRequest } from '../models/api-models/add-student-request.model';
import { Student } from '../models/api-models/student.model';
import { UpdateStudentRequest } from '../models/api-models/update-student-request.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl= 'https://localhost:44342';

  constructor(private httpClient: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students')
  }

  getStudent(studentId: string): Observable<Student> {
   return this.httpClient.get<Student>(this.baseApiUrl + '/students/' + studentId)
  }

  updateStudent(studentId: string, studentRequest: Student): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.Adress.physicalAddress,
      postalAddress: studentRequest.Adress.postalAddress
    };

    return this.httpClient.put<Student>(this.baseApiUrl + '/students/' + studentId, updateStudentRequest);
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(this.baseApiUrl  + '/students/' + studentId)
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.Adress.physicalAddress,
      postalAddress: studentRequest.Adress.postalAddress
    };

    return this.httpClient.post<Student>(this.baseApiUrl + '/students/add',
    addStudentRequest);
  }

  uploadImage(studentId: string, file: File): Observable<any> {
    const formDate = new FormData();
    formDate.append("profileImage", file);

    return this.httpClient.post(this.baseApiUrl + '/students/' + studentId + '/upload-image', formDate, {
      responseType: 'text'
    })
  };

  getImagePath(relativePath: string) {
    return `${this.baseApiUrl}/${relativePath}`;
  }
}
