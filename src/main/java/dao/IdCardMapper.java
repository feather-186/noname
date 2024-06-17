package dao;

import org.apache.ibatis.annotations.Select;
import pojo.IdCard;

public interface IdCardMapper {
    @Select("select * from idcard where id=#{id}")
    IdCard selectById(int id);
}
