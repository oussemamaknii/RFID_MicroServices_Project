package com.axelib;

import java.io.Serializable;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "MS-User")
public class User implements Serializable {

    @Id
    @Indexed(unique = true)
    @Field(value = "User_id")
    private String id;

    @Field(value = "Name")
    private String name;

    @Field(value = "Email")
    private String email;

    @Field(value = "Role")
    private String role;

    @Field(value = "imageUrl")
    private String imageUrl;

    @Indexed(unique = true)
    @Field(value = "uid")
    private String uid;

    public User() {
    }

    public User(String id, String name, String email, String role, String imageUrl, String uid) {
        super();
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.imageUrl = imageUrl;
        this.uid = uid;
    }

    @Override
    public String toString() {
        return "User [id=" + id + ",name=" + name + ", email=" + email + ", role=" + role + ", imageUrl=" + imageUrl + ", uid=" + uid
                + "]";
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }
}
