import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/models/book.model';

@Component({
  selector: 'app-root', // <app-root>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public books: Book[] = [];
  public title: String = 'My books';
  public form: FormGroup;  
  public mode: String = 'list';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.required,
      ])]
    })

    this.load();
  }

  remove(book: Book){
    const index = this.books.indexOf(book);
    if (index !== -1){
      this.books.splice(index, 1);
    }
    this.save();
  }

  markAsDone(book: Book){
    book.done = true;
    this.save();
  }

  changeMode(mode: String) {
    this.mode = mode;
  }

  markAsUndone(book: Book){
    book.done = false;
    this.save();
  }

  clear(){
    this.form.reset();
  }

  addBook(){
    this.books.push(
      new Book(
        this.books.length + 1,
        this.form.controls['title'].value,
        false
      )
    )
    this.save();
    this.clear();
  }

  save(){
    const data = JSON.stringify(this.books);
    localStorage.setItem('books', data);
  }

  load(){
    const data = localStorage.getItem('books');
    this.books = data !== null? JSON.parse(data) : {};
  }
}
