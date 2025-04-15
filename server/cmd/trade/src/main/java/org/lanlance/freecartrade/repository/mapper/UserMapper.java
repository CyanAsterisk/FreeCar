package org.lanlance.freecartrade.repository.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserMapper {

    @Select("SELECT EXISTS(SELECT 1 FROM user WHERE id = #{userId})")
    boolean existsById(@Param("userId") String userId);

    @Update("UPDATE user SET balance = balance + #{amount} WHERE id = #{userId}")
    int updateBalance(@Param("userId") String userId, @Param("amount") Integer amount);
}
