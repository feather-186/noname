package dao;

import org.apache.ibatis.annotations.Select;
import pojo.Product;

import java.util.List;

public interface ProductMapper {
    @Select("select * from product where id in(select product_id from ordersitem where orders_id=#{id})")
    List<Product> selectProductByOrdersId(int orders_id);
}

/*
多对多
select * from orders where id=1;
select * from ordersitem where orders_id=1;
*/