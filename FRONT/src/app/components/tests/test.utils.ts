import { HttpTestingController } from '@angular/common/http/testing';
import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

export function findComponent<T>(
  fixture: ComponentFixture<T> | DebugElement,
  selector: string): DebugElement {
  if(fixture instanceof ComponentFixture) return fixture.debugElement.query(By.css(selector));
  return fixture.query(By.css(selector));
}

export function findAllComponents<T>(
  fixture: ComponentFixture<T> | DebugElement,
  selector: string): DebugElement[] {
  if(fixture instanceof ComponentFixture) return fixture.debugElement.queryAll(By.css(selector));
  return fixture.queryAll(By.css(selector));
}

export function mockRequest<T>(httpMock: HttpTestingController, urlPartial: string, result: T ) {
  const req = httpMock.expectOne(`${environment.apiBaseUrl}/${urlPartial}`);
  req.flush(result);
}

