package dao;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import pojo.Orders;
import utils.MybatisUtils;

public class OrdersMapperTest {
    @Test
    public void selectOrdersById() {
        SqlSession sqlSession = MybatisUtils.getSession();
        OrdersMapper mapper = sqlSession.getMapper(OrdersMapper.class);
        Orders orders = mapper.selectOrdersById(1);
        System.out.println(orders);
        sqlSession.close();
    }

}