package edu.icet.dto;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderItemDetails {

    private Integer orderId;
    private Integer productId;
    private Double totalPrice;
    //private String productName;
    private Integer qty;
    //private Double unitPrice;
}
