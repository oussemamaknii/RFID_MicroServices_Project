package com.esprit.microservice;


import java.io.Serializable;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Book implements Serializable {

	private static final long serialVersionUID = 1L;

	
    private String uid,bookName,link;
    
	@Id
    private int ISBN;

    public String getUid() {
    return uid;
    }
    public void setUid(String uid) {
    this.uid = uid;
    }
    public int getISBN() {
    return ISBN;
    }
    public void setISBN(int ISBN) {
    this.ISBN = ISBN;
    }
    public String getbookName() {
    return bookName;
    }
    public void setbookName(String bookName) {
    this.bookName = bookName;
    }
    
    public String getLink() {
		return link;
	}
    public void setLink(String link) {
		this.link = link;
	}
    public Book() {
    super();
    }
    public Book(String uid,int ISBN,String bookName,String link) {
    super();
    this.uid = uid;
    this.bookName=bookName;
    this.ISBN=ISBN;
    this.link=link;
    }

}
