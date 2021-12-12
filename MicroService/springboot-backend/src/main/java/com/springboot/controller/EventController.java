package com.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springboot.exception.ResourceNotFoundException;
import com.springboot.model.Event;
import com.springboot.repository.EventRepository;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class EventController {

	@Autowired
	private EventRepository EventRepository;
	
	// get all Events
	@GetMapping("/events")
	public List<Event> getAllEvents(){
		return EventRepository.findAll();
	}		
	
	// create Event rest api
	@PostMapping("/events")
	public Event createEvent(@RequestBody Event Event) {
		return EventRepository.save(Event);
	}
	
	// get Event by id rest api
	@GetMapping("/events/{id}")
	public ResponseEntity<Event> getEventById(@PathVariable Long id) {
		Event Event = EventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event not exist with id :" + id));
		return ResponseEntity.ok(Event);
	}
	
	// update Event rest api
	
	@PutMapping("/events/{id}")
	public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event EventDetails){
		Event Event = EventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		Event.setNom_event(EventDetails.getNom_event());
		Event.setDescription(EventDetails.getDescription());
		Event.setOrganisateur(EventDetails.getOrganisateur());
		
		Event updatedEvent= EventRepository.save(Event);
		return ResponseEntity.ok(updatedEvent);
	}
	
	// delete Event rest api
	@DeleteMapping("/events/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEvent(@PathVariable Long id){
		Event Event = EventRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Event not exist with id :" + id));
		
		EventRepository.delete(Event);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
	
}
