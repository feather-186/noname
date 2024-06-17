import dao.WorkerMapper;
import org.apache.ibatis.session.SqlSession;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import pojo.Worker;
import utils.MybatisUtils;

public class MyBatisTest {
    SqlSession session;
    WorkerMapper mapper;

    @Before
    public void set() {
        session = MybatisUtils.getSession();
        mapper = session.getMapper(WorkerMapper.class);
    }

    @After
    public void release() {
        session.close();
    }

    @Test
    public void findById() {
        Worker worker = mapper.selectWorker(1);
        System.out.println(worker.toString());
    }

    @Test
    public void selectByIdAndName() {
        Worker Worker=mapper.selectByIdAndName(3, "刘迪");
        System.out.println(Worker.toString());
    }

    //    @Test
    public void insertById() {
        Worker worker = new Worker();
        worker.setName("赵六");
        worker.setSex("男");
        worker.setWorker_id("4");
        worker.setAge(13);
        mapper.insertWorker(worker);
        session.commit();
    }

    //    @Test
    public void updateWorker() {
        Worker worker = new Worker();
        worker.setId(3);
        worker.setAge(30);
        worker.setName("刘迪");
        mapper.updateWorker(worker);
        session.commit();
    }

    //    @Test
    public void deleteWorker() {
        mapper.deleteWorker(10);
        session.commit();
    }

}


