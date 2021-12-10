package com.springboot.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "event")
public class Event {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(name = "nom_event")
	private String nom_event;

	@Column(name = "description")
	private String description;
	
	@Column(name = "organisateur")
	private String organisateur;
	
	
	public Event() {
		
	}
	
	public Event(String nom_event, String description, String organisateur) {
		super();
		this.nom_event = nom_event;
		this.description = description;
		this.organisateur= organisateur;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getNom_event() {
		return nom_event;
	}

	public void setNom_event(String nom_event) {
		this.nom_event = nom_event;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOrganisateur() {
		return organisateur;
	}

	public void setOrganisateur(String organisateur) {
		this.organisateur = organisateur;
	}
	
	
	
}
