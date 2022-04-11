import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

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
