package com.bezkoder.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "concours")
public class Concours {
  @Id
  private String id;
  
   @Indexed(unique = true)
	private String nom;
	private String lieu;
	private String objectifs;
	private String prix;
	private String regles;
	private String date;
	private int nbr_cand;
	
	public Concours() {
		
	}
	
	
	public Concours(String id, String nom, String lieu, String objectifs, String prix, String regles, String date,
			int nbr_cand) {
		super();
		this.id = id;
		this.nom = nom;
		this.lieu = lieu;
		this.objectifs = objectifs;
		this.prix = prix;
		this.regles = regles;
		this.date = date;
		this.nbr_cand = nbr_cand;
	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}
	

	public String getNom() {
		return nom;
	}


	public void setNom(String nom) {
		this.nom = nom;
	}


	public String getLieu() {
		return lieu;
	}


	public void setLieu(String lieu) {
		this.lieu = lieu;
	}


	public String getObjectifs() {
		return objectifs;
	}


	public void setObjectifs(String objectifs) {
		this.objectifs = objectifs;
	}


	public String getPrix() {
		return prix;
	}


	public void setPrix(String prix) {
		this.prix = prix;
	}


	public String getRegles() {
		return regles;
	}


	public void setRegles(String regles) {
		this.regles = regles;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public int getNbr_cand() {
		return nbr_cand;
	}


	public void setNbr_cand(int nbr_cand) {
		this.nbr_cand = nbr_cand;
	}


	@Override
	public String toString() {
		return "Concours [nom=" + nom + ", lieu=" + lieu + ", date=" + date + ", nbr_cand=" + nbr_cand + "]";
	}
}
