package edu.icet.service.impl;

import edu.icet.dto.Customer;
import edu.icet.entity.CustomerEntity;
import edu.icet.repository.CustomerRepository;
import edu.icet.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    final CustomerRepository customerRepository;
    final ModelMapper mapper;
    @Override
    public List<Customer> getAll() {
        List<Customer> customerList = new ArrayList<>();
        List<CustomerEntity> customerEntityList = customerRepository.findAll();

        for (CustomerEntity customerEntity : customerEntityList) {
            customerList.add(mapper.map(customerEntity, Customer.class));
        }
        return customerList;
    }

    @Override
    public boolean addCustomer(Customer customer) {
        try {
            CustomerEntity save = customerRepository.save(mapper.map(customer, CustomerEntity.class));
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean updateCustomer(Customer customer) {
        try {
            CustomerEntity save = customerRepository.save(mapper.map(customer, CustomerEntity.class));
            return save != null;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean deleteCustomer(Integer id) {
        try {
            customerRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
