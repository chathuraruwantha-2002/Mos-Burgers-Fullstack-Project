package edu.icet.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Order {
    private Integer orderId;
    private Double subTotal;
    private Double discount;
    private Double tax;
    //private Double grandTotal;
    private String isReturned;
    private String paymentType;
    private String date;
    private Integer empId;
    private Integer custId;

}
