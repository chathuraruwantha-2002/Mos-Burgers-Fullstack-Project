package edu.icet.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "orders")
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderId;
    private Double subTotal;
    private Double discount;
    private Double tax;
    private String isReturned;
    private String paymentType;
    private String date;
    private Integer empId;

    @ManyToOne
    @JoinColumn(name = "custId", referencedColumnName = "custid")
    private CustomerEntity customer;
}
