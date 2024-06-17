package dao;

import org.apache.ibatis.annotations.*;
import org.junit.Before;
import pojo.Worker;

public interface WorkerMapper {
    @Select("select * from worker where id = #{id}")
    Worker selectWorker(int id);

    @Insert("insert into worker(name,age,sex,worker_id)values(#{name},#{age},#{sex},#{worker_id})")
    int insertWorker(Worker worker);

    @Update("update worker set name=#{name},age=#{age} where id=#{id}")
    int updateWorker(Worker worker);

    @Delete("delete from worker where id=#{id}")
    int deleteWorker(int id);

    @Select("select * from worker where id=#{p1} and name=#{p2}")
    Worker selectByIdAndName(@Param("p1") int id, @Param("p2") String name);
}
