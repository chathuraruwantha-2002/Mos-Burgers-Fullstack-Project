package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Data
public class Customer {
    private Integer custId;
    private String firstName;
    private String lastName;
    private String gender;
    private String occupation;
    private String location;
    private String email;
    private String phone;
    private String additionalInfo;
}
