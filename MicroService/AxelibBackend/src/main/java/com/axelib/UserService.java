package com.axelib;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private final UserRepository userRepo;
	@Autowired
	private SequenceGeneratorService service;

    public UserService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    public User addUser(User user) {
    	user.setUserId(service.getSequenceNumber(User.SEQUENCE_NAME));
        return this.userRepo.save(user);
    }

    public List<User> findAll() {
        return this.userRepo.findAll();
    }

    public User findUserById(Long id) {
        return this.userRepo.findByUserId(id).get();
    }

    public User updateUser(Long id, User newUser) {
    	System.out.println(id);
		if (this.userRepo.findByUserId(id).isPresent()) {
			User existingUser = this.userRepo.findByUserId(id).get();
			existingUser.setUserId(id);
			existingUser.setName(newUser.getName());
			existingUser.setEmail(newUser.getEmail());
			existingUser.setRole(newUser.getRole());
			existingUser.setImageUrl(newUser.getImageUrl());
			existingUser.setUid(newUser.getUid());

			return this.userRepo.save(existingUser);
		} else
			return null;
	}

    public String deleteUser(Long User_id) {
		if (this.userRepo.findByUserId(User_id).isPresent()) {
			this.userRepo.deleteByUserId(User_id);
			return "user supprimé";
		} else
			return "user non supprimé";
	}
}
