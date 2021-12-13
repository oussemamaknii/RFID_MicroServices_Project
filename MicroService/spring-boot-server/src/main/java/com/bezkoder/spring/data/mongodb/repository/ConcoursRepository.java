package com.bezkoder.spring.data.mongodb.repository;

import java.util.List;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.bezkoder.spring.data.mongodb.model.Concours;

public interface ConcoursRepository extends MongoRepository<Concours, String> {
  List<Concours> findByLieu(String lieu);
  List<Concours> findByNom(String nom);
}
