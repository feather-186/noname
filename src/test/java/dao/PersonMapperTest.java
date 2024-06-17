package dao;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import pojo.Person;
import utils.MybatisUtils;

public class PersonMapperTest {
    @Test
    public void selectById() {
        SqlSession sqlSession = MybatisUtils.getSession();
        PersonMapper personMapper = sqlSession.getMapper(PersonMapper.class);
        Person person = personMapper.selectById(1);
        System.out.println(person);
        sqlSession.close();
    }
}