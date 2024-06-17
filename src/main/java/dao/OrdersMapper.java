package dao;

import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import pojo.Orders;

import java.util.List;

public interface OrdersMapper {
    @Select("select * from orders where user_id=#{id}")
    @Results({
            @Result(id = true, column = "id", property = "id"),
            @Result(column = "number", property = "number")
    })
    List<Orders> selectById(int user_id);

    @Select("select * from orders where id=#{id}")
    @Results({
            @Result(id = true, column = "id", property = "id"),
            @Result(column = "number", property = "number"),
            @Result(column = "id", property = "productList",
                    many = @Many(select = "dao.ProductMapper.selectProductByOrdersId"))
    })
    Orders selectOrdersById(int id);
}
