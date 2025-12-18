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

    @GetMapping("/products/{id}")
    @Transactional(readOnly = true)
    public ProductDto getItem(@PathVariable int id) {
        Product product = productService.findById(id)
                .orElseThrow(() -> new RuntimeException("상품이 존재하지 않습니다."));
        return new ProductDto(product);
    }




    public record ProductCreateReq(
            @NotBlank
            String name,
            @NotNull
            Integer price,
            @Size(max = 500)
            String description,
            @Size(max = 300)
            String imageUrl
    ) {
    }

    @PostMapping("/product")
    public RsData<ProductDto> createProduct(@RequestBody @Valid ProductCreateReq req) {
        Product product = productService.create(req.name, req.price, req.description, req.imageUrl);
        return new RsData<>(
                "200-1",
                "%d번 상품이 생성되었습니다.".formatted(product.getId()),
                new ProductDto(product)
        );
    }
    @DeleteMapping("/product/{id}")
    @Transactional
    public RsData<Void> delete(@PathVariable int id) {
        Product product = productService.findById(id).get();

        productService.delete(product);

        return new RsData<>(
                "200-1",
                "%s 상품이 삭제되었습니다.".formatted(product.getName())
        );
    }
    @PutMapping("/product/{id}")
    @Transactional
    public RsData<Void> modify(@PathVariable int id,@RequestBody @Valid ProductCreateReq req){
        Product product = productService.findById(id).get();
        productService.modify(product, req.name, req.price, req.description, req.imageUrl);
        return new RsData<>(
                "200-1",
                "%s 상품이 수정되었습니다.".formatted(product.getName())
        );
    }
}
