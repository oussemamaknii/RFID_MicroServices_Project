package com.bezkoder.spring.data.mongodb.controller;

import java.util.ArrayList;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bezkoder.spring.data.mongodb.model.Concours;
import com.bezkoder.spring.data.mongodb.repository.ConcoursRepository;

@CrossOrigin(origins = "http://localhost:4646")
@RestController
@RequestMapping("/api")
public class ConcoursController {

  @Autowired
  ConcoursRepository concoursRepository;

  @GetMapping("/concours")
  public ResponseEntity<List<Concours>> getAllConcours(@RequestParam(required = false) String nom) {
    try {
      List<Concours> concours = new ArrayList<Concours>();

      if (nom == null)
    	  concoursRepository.findAll().forEach(concours::add);
      else
    	  concoursRepository.findByNom(nom).forEach(concours::add);

      if (concours.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(concours, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/concours/{id}")
  public ResponseEntity<Concours> getConcoursById(@PathVariable("id") String id) {
    Optional<Concours> concoursData = concoursRepository.findById(id);

    if (concoursData.isPresent()) {
      return new ResponseEntity<>(concoursData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/concours")
  public ResponseEntity<Concours> createConcours(@RequestBody Concours concours) {
    try {
    	Concours _concours = concoursRepository.save(new Concours(concours.getId(),concours.getNom(), concours.getLieu(), concours.getObjectifs(),concours.getPrix(), concours.getRegles(), concours.getDate(), concours.getNbr_cand()));
      return new ResponseEntity<>(_concours, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/concours/{id}")
  public ResponseEntity<Concours> updateConcours(@PathVariable("id") String id, @RequestBody Concours concours) {
    Optional<Concours> concoursData = concoursRepository.findById(id);

    if (concoursData.isPresent()) {
    	Concours _concours = concoursData.get();
    	_concours.setNom(concours.getNom());
    	_concours.setLieu(concours.getLieu());
    	_concours.setObjectifs(concours.getObjectifs());
      return new ResponseEntity<>(concoursRepository.save(_concours), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/concours/{id}")
  public ResponseEntity<HttpStatus> deleteConcours(@PathVariable("id") String id) {
    try {
    	concoursRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/concours")
  public ResponseEntity<HttpStatus> deleteAllConcours() {
    try {
    	concoursRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /*@GetMapping("/concours/published")
  public ResponseEntity<List<Concours>> findByPublished() {
    try {
      List<Concours> concours = concoursRepository.findByLieu(true);

      if (concours.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(concours, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/

}
