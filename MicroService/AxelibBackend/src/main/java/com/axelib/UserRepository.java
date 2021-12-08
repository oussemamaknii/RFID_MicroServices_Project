package com.axelib;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByUserId(Long userId);

	void deleteByUserId(Long userId);

}
