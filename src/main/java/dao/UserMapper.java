package dao;

import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import pojo.User;

public interface UserMapper {
    @Select("select * from user where id=#{id}")
    @Results({@Result(id = true, column = "id", property = "id"),
            @Result(column = "name", property = "name"),
            @Result(column = "address", property = "address"),
            @Result(column = "id", property = "ordersList",
                    many = @Many(select = "dao.OrdersMapper.selectById")),
    })
    User selectById(int id);

/*
    select * from user where id = 1;
    select * from orders where user_id = 上列的id值(1);
*/
}
