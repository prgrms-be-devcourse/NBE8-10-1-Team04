package com.back.domain.product.controller;

import com.back.domain.product.dto.ProductDto;
import com.back.domain.product.entity.Product;
import com.back.domain.product.service.ProductService;
import com.back.global.rsData.RsData;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class ApiV1ProductController {
    private final ProductService productService;

    @GetMapping("/products")
    @Transactional(readOnly = true)
    public List<ProductDto> getItems() {
        List<Product> items = productService.findAll();

        return items.stream().map(ProductDto::new).toList();
    }

    public record ProductCreateReq(
            @NotBlank
            String name,
            @NotNull
            Integer price,
            @Size(max = 500)
            String description
    ) {
    }

    @PostMapping("/product")
    public RsData<ProductDto> createProduct(@RequestBody @Valid ProductCreateReq req) {
        Product product = productService.create(req.name, req.price, req.description);
        return new RsData<>(
                "200-1",
                "%d번 상품이 생성되었습니다.".formatted(product.getId()),
                new ProductDto(product)
        );
    }
    @DeleteMapping("product/{id}")
    @Transactional
    public Void delete(@PathVariable int id) {
        Product product = productService.findById(id).get();

        productService.delete(product);
        return null; //Todo : rsData 추가해야함 현재는 리턴값이 없어서 그냥 삭제됨
    }
    @PutMapping("product/{id}")
    @Transactional
    public Void modify(@PathVariable int id,String name,int price,String description){
        Product product = productService.findById(id).get();
        productService.modify(product, name, price, description);
        return null; //Todo : rsData 추가, req사용하게 변경
    }
}
