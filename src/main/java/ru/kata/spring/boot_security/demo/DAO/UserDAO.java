package ru.kata.spring.boot_security.demo.DAO;

import org.springframework.data.domain.Pageable;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface UserDAO extends JpaRepository<User,Long> {
    @Query("select u from User u join fetch u.roles where u.username = :username")
    User findByUsername(@Param("username")String username);

    @Query( "select u from User u JOIN FETCH u.roles r where r.role = :role" )
    List<User> findByRolesIn(@Param("role") String roleName);
}