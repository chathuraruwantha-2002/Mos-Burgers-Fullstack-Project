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
@Table(name = "orderdetails")
public class OrderItemDetailsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderDetailId;

    @ManyToOne
    @JoinColumn(name = "orderId", referencedColumnName = "orderid")
    private OrderEntity order;
    @ManyToOne
    @JoinColumn(name = "productId", referencedColumnName = "productid")
    private ProductEntity product;

    private Double totalPrice;
    //private String productName;
    private Integer qty;
    //private Double unitPrice;

}
